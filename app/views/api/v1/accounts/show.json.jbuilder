json.partial! 'api/v1/models/account', formats: [:json], resource: @account
json.latest_bchat_version @latest_bchat_version
json.partial! 'enterprise/api/v1/accounts/partials/account', account: @account if BchatApp.enterprise?
