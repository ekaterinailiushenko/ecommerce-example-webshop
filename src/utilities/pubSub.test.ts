import { Events, PubSub } from './pubSub'

const callback = vi.fn()

describe('PubSub', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call the subscriber callback when an event is published', () => {
    const unsubscribe = PubSub.subscribe(Events.USER_LOGGED_IN, callback)

    PubSub.publish(Events.USER_LOGGED_IN)

    expect(callback).toHaveBeenCalledTimes(1)

    unsubscribe()
  })

  it('should not call the subscriber callback after unsubscribing', () => {
    const unsubscribe = PubSub.subscribe(Events.USER_LOGGED_IN, callback)

    unsubscribe()

    PubSub.publish(Events.USER_LOGGED_IN)

    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('should not call any callback if no subscribers are registered for an event', () => {
    PubSub.publish(Events.USER_LOGGED_IN)

    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('should handle multiple subscribers for the same event', () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()

    PubSub.subscribe(Events.USER_LOGGED_IN, callback1)
    PubSub.subscribe(Events.USER_LOGGED_IN, callback2)

    PubSub.publish(Events.USER_LOGGED_IN)

    expect(callback1).toHaveBeenCalledTimes(1)
    expect(callback2).toHaveBeenCalledTimes(1)
  })
})
