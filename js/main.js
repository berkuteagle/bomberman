import Booombers from '../game/booombers.js';
import Transport from '../net/transport.js';
import Node from '../net/node.js';

const booombers = new Booombers();
const net_transport = new Transport();
const net_node = new Node('123321', net_transport);

window.booombers = booombers;
window.net_transport = net_transport;
window.net_node = net_node;