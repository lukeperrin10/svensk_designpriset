# Generated by Django 2.2.7 on 2019-11-19 13:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('despri_admin', '0009_auto_20191119_1420'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vote',
            name='verified',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Verified'),
        ),
    ]