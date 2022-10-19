import Booombers from './game/booombers.js';
import Node from './net/node.js';

const booombers = new Booombers();
const net_node_1 = new Node();
const net_node_2 = new Node();

window.booombers = booombers;
window.net_node_1 = net_node_1;
window.net_node_2 = net_node_2;
