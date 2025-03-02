// ** Slides
import auth from './auth'
import users from './users'
import donations from './donations'
import activities from './activities'
import events from './events'
import messages from './messages'
import transactions from './transactions'

const rootReducer = {
  auth,
  users,
  donations,
  activities,
  events,
  messages,
  transactions,
}

export default rootReducer
