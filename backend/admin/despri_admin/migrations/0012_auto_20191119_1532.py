# Generated by Django 2.2.7 on 2019-11-19 14:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('despri_admin', '0011_auto_20191119_1436'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='category',
            table='categories',
        ),
        migrations.AlterModelTable(
            name='content',
            table='content',
        ),
        migrations.AlterModelTable(
            name='entry',
            table='entries',
        ),
        migrations.AlterModelTable(
            name='poll',
            table='polls',
        ),
        migrations.AlterModelTable(
            name='profile',
            table='profiles',
        ),
        migrations.AlterModelTable(
            name='vote',
            table='votes',
        ),
    ]
