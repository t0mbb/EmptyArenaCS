import account from '../models/account.model';

export async function findOneAccount(searchObj) {
  return account.findOne(searchObj).populate('role_id');
}