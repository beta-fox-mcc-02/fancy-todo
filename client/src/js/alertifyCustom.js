function titleAlertify (status) {
  if (status === 'delete') alertify.defaults.glossary.title = 'Delete Todo'
  if (status === 'done') alertify.defaults.glossary.title = 'Done Todo'
}