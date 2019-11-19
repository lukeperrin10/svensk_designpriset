# Generated by Django 2.2.7 on 2019-11-19 12:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('despri_admin', '0003_auto_20191119_1029'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='shorttag',
        ),
        migrations.AddField(
            model_name='category',
            name='modified',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='category',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.CreateModel(
            name='Entry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('profile_id', models.IntegerField(verbose_name='Profile Id')),
                ('secret', models.CharField(max_length=255, verbose_name='Secret')),
                ('entry_name', models.CharField(max_length=127, verbose_name='Entry name')),
                ('source', models.CharField(blank=True, max_length=255, null=True, verbose_name='Source')),
                ('designer', models.CharField(blank=True, max_length=511, null=True, verbose_name='Designer')),
                ('illustrator', models.CharField(max_length=511, verbose_name='Illustrator')),
                ('leader', models.CharField(blank=True, max_length=511, null=True, verbose_name='Leader')),
                ('customer', models.CharField(blank=True, max_length=511, null=True, verbose_name='Customer')),
                ('avatar', models.CharField(blank=True, max_length=50, null=True, verbose_name='Avatar')),
                ('format', models.CharField(blank=True, max_length=20, null=True, verbose_name='Format')),
                ('size', models.CharField(blank=True, max_length=20, null=True, verbose_name='Size')),
                ('webpage', models.CharField(blank=True, max_length=255, null=True, verbose_name='Webpage')),
                ('is_winner_gold', models.BooleanField(default=False, verbose_name='Winner Gold')),
                ('is_winner_silver', models.BooleanField(default=False, verbose_name='Winner Silver')),
                ('is_nominated', models.BooleanField(default=False, verbose_name='Nominated')),
                ('sent_nominee_notification', models.DateField(verbose_name='Nominee notification date')),
                ('motivation', models.TextField(verbose_name='Motivation')),
                ('year', models.CharField(max_length=4, verbose_name='Year')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='entries', to='despri_admin.Category', verbose_name='Category')),
            ],
            options={
                'verbose_name': 'Entry',
                'verbose_name_plural': 'Entries',
            },
        ),
    ]
