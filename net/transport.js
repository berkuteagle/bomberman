export default class Transport extends EventTarget {


    start() { }

    stop() { }

    send(uuid, message) {

    }

    connect(some_uuid_here) {
        this.dispatchEvent(new CustomEvent('connect', { detail: some_uuid_here }));
    }

    disconnect(some_uuid_here) {
        this.dispatchEvent(new CustomEvent('disconnect', { detail: some_uuid_here }));
    }
}