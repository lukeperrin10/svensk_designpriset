# Generated by Django 3.0.4 on 2020-04-29 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('despri_admin', '0005_auto_20200330_0718'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='order',
            field=models.IntegerField(blank=True, null=True, verbose_name='Order'),
        ),
    ]
