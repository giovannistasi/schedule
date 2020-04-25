import { events } from '../stitch/mongodb';

export const loadEvents = () => async (dispatch) => {
  console.log('loading1')
  const eventList = await events.find({}, { limit: 1000 }).asArray();
  console.log('loading2')
  console.log(eventList)
  dispatch({ type: 'getEvents', payload: { eventList } });
};
export const addEvent = (eventData, userId) => async (dispatch) => {

  const event = { createdAt: new Date(), eventData, user_id: userId };
  const result = await events.insertOne(event);
  dispatch({
    type: 'postEvent',
    payload: { ...result }
  });
};
export const removeEvent = (eventId) => async (dispatch) => {
  await events.deleteOne({ _id: eventId });
  dispatch({ type: 'deleteEvent', payload: { id: eventId } });
};

export const updateEventStatus = (eventId) => async (dispatch) => {
  const event = events.find((t) => t._id === eventId);
  await events.updateOne(
    { _id: eventId },
    { $set: { status: event.currentStatus } }
  );
  dispatch({ type: 'setEventStatus', payload: { id: eventId } });
};
