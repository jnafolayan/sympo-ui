const pusher = new Pusher('8318ef2ddc8290015aed', {
  cluster: 'eu',
  forceTLS: true
});

let currentChannel = null;

export const unsubscribeAll = () => {
  if (currentChannel)
    pusher.unsubscribe(currentChannel);
  currentChannel = null;
};

export const subscribe = (newChannel) => {
  unsubscribeAll();
  currentChannel = newChannel;
  console.log(pusher)
  return pusher.subscribe(newChannel);
};

export default pusher;