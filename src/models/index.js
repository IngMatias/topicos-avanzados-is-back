import Account from './account.js'
import Category from './category.js'
import Currency from './currency.js'
import CurrencyBCU from './currencyBCU.js'
import CurrencyExchange from './currencyExchange.js'
import Transaction from './transaction.js'
import User from './user.js'

import TransactionCategory from './transactionCategory.js'

User.hasMany(Account, { foreignKey: 'userId' })
Account.belongsTo(User, { foreignKey: 'userId' })

Currency.hasMany(Account, { foreignKey: 'currencyId' })
Account.belongsTo(Currency, { foreignKey: 'currencyId' })

User.hasMany(Category, { foreignKey: 'userId' })
Category.hasMany(User, { foreignKey: 'userId' })

Currency.hasMany(Transaction, { foreignKey: 'currencyId' })
Transaction.belongsTo(Currency, { foreignKey: 'currencyId' })

Currency.hasOne(CurrencyBCU, { foreignKey: 'currencyId' })
CurrencyBCU.belongsTo(Currency, { foreignKey: 'currencyId' })

Currency.hasMany(CurrencyExchange, { foreignKey: 'currencyId' })
CurrencyExchange.belongsTo(Currency, { foreignKey: 'currencyId' })

Account.hasMany(Transaction, { foreignKey: 'accountId' })
Transaction.belongsTo(Account, { foreignKey: 'accountId' })

Transaction.belongsToMany(Category, {
  through: TransactionCategory,
  foreignKey: 'transactionId'
})
Category.belongsToMany(Transaction, {
  through: TransactionCategory,
  foreignKey: 'categoryId'
})

export {
  Account,
  Category,
  Currency,
  CurrencyBCU,
  CurrencyExchange,
  Transaction,
  User
}
