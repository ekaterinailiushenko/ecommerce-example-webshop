type Callback = () => void

type Subscribers = {
  [K in Events]?: Callback[]
}

const subscribers: Subscribers = {}

export enum Events {
  USER_LOGGED_IN = 'USER_LOGGED_IN',
}

export const PubSub = {
  publish(event: Events) {
    if (!subscribers[event]) {
      return
    }

    subscribers[event]?.forEach(subscriberCallback => subscriberCallback())
  },
  subscribe(event: Events, callback: () => void) {
    if (!subscribers[event]) {
      subscribers[event] = []
    }

    const index = subscribers[event]!.push(callback) - 1

    return () => {
      subscribers[event]!.splice(index, 1)
    }
  },
}
