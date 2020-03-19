from .base_admin import BaseAdmin

class CategoryAdmin(BaseAdmin):

    list_display = ('name', 'type', 'active')

    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions
    
    def has_delete_permission(self, request, obj=None):
        return False