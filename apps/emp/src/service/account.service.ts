import account from '../models/account/account.model';
import passport from 'passport'
export function findOneAccount(searchObj) {
  return account.findOne(searchObj)
}

