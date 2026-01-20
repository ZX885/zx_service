from django.db import transaction
from decimal import Decimal
from users.models import Profile, Transaction

@transaction.atomic
def freeze_money(profile: Profile, amount: Decimal, product:None):
    if profile.balance < amount:
        raise ValueError("Недостаточно средтсв!")
    
    profile.balance -= amount
    profile.frozen_balance += amount
    profile.save()
    
    Transaction.objects.create(
        user=profile,
        amount=amount,
        type="freeze"
        ralated_product=product,
        description="Заморозка средств"
    )
@transaction.atomic
def unfreeze_money(profile:Profile, amount: Decimal, product:None):
    profile.frozen_balance -= amount
    profile.balance += amount
    profile.save()
    Transaction.objects.create(
        user=profile,
        amount=amount,
        type="unfreeze"
        ralated_product=product,
        description="Разморозка средств"
    )
    
@transaction.atomic
def pay(profile: Profile, amount: Decimal, product:None):
    if profile.frozen_balance < amount:
        raise ValueError("Недостаточно замороженных средств!")
    profile.frozen_balance -=amount
    profile.save()
    Transaction.objects.create(
        user=profile,
        amount=amount,
        type="payment"
        ralated_product=product,
        description="Оплата товара"
    )
    