class ApplicationHelper::Toolbar::MiqAeMethodCenter < ApplicationHelper::Toolbar::Basic
  button_group('miq_ae_method_vmdb', [
    select(
      :miq_ae_method_vmdb_choice,
      'fa fa-cog fa-lg',
      N_('Configuration'),
      :items => [
        button(
          :miq_ae_method_edit,
          'pficon pficon-edit fa-lg',
          N_('Edit this Method'),
          :klass => ApplicationHelper::Button::MiqAeDefault),
        button(
          :miq_ae_method_copy,
          'fa fa-files-o fa-lg',
          N_('Copy this Method'),
          :klass => ApplicationHelper::Button::MiqAeInstanceCopy),
        button(
          :miq_ae_method_delete,
          'pficon pficon-delete fa-lg',
          N_('Remove this Method'),
          :url_parms => "&refresh=y",
          :confirm   => N_("Are you sure you want to remove this Method?"),
          :klass     => ApplicationHelper::Button::MiqAeDefault),
      ]
    ),
  ])
end
