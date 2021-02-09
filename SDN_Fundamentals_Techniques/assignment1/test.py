#!/usr/bin/python

"""
Environment description:
- ONOS VM and Mininet VM with the bridge network mode on my local physical machine
- Display ip info of ONOS VM, Mininet VM and my physical local machine as follows
-- ONOS VM based on VirtualBox:
    root@jingyan:/home/jingyan/onos# ifconfig -a | grep inet
        inet 192.168.1.112
    In the 1st terminal:
        root@jingyan:/home/jingyan/onos# bazel run onos-local clean debug
    In the 2nd terminal:
        root@jingyan:/home/jingyan/onos# ./tools/test/bin/onos localhost
-- Mininet VM based on VirtualBox:
    root@mininet-vm:~# ifconfig -a | grep inet
       inet 192.168.1.109
-- Local Physical Machine: 
    yanjing@yanjingdeMacBook-Pro ~ % ifconfig en0 | grep inet
   inet 192.168.1.101

Code Function Description
- Use pyAPI create single-switch/linear/tree topology
- Single-switch topology accepts "single_switch_host_num" as parameter
- Linear topology accepts "linear_host_num" as parameter   
- Tree topology accepts "tree_depth" and "tree_fanout" as paramters
"""

from mininet.cli import CLI
from mininet.net import Mininet
from mininet.node import Host, RemoteController, OVSSwitch
from mininet.topolib import TreeNet
from mininet.examples.treeping64 import HostV4
 
net=Mininet(topo=None, build=False)
c0=net.addController(name='c0', controller=RemoteController, ip='192.168.1.112', protocol='tcp', port=9876)
 
def single_switch(single_switch_host_num):
  global net
  global c0
  s1=net.addSwitch('s1')
  for index in range(0,single_switch_host_num):
      host=net.addHost("h%s" % (index+1))
      net.addLink(host, s1)
  net.build()
  c0.start()
  net.get('s1').start([c0])
  CLI(net)
  net.stop()
 
def linear(linear_host_num):
   global net
   global c0
   for index in range(0,linear_host_num):
       switch=net.addSwitch('s%s' % (index+1))
       host=net.addHost("h%s" % (index+1))
       net.addLink(switch, host)
   for index in range(0,linear_host_num-1):  
      net.addLink('s%s' % (index+2), 's%s' % (index+1))
   net.build()
   c0.start()
   for index in range(0,linear_host_num):
       net.get('s%s'% (index+1)).start([c0])
   CLI(net)
   net.stop()
 
def tree(tree_depth, tree_fanout):
   network = TreeNet( depth=tree_depth, fanout=tree_fanout, host=HostV4, switch=OVSSwitch, waitConnected=True)
   network.run( CLI, network )
   net.stop()
 
if __name__ == '__main__':
   topo_type = input("Pls input Topo type (single-switch or linear or tree): ")
   if topo_type == 'single-switch':
       single_switch_host_num = input("Pls input host num for single-switch topo: ")
       single_switch(int(single_switch_host_num))
   elif topo_type == 'linear':
       linear_host_num = input("Pls input switch/host num for linear topo: ")
       linear(int(linear_host_num))
   elif topo_type == 'tree':
       tree_depth = input("Pls input depth for tree topo: ")
       tree_fanout = input("Pls input fanout for tree topo: ")
       tree(int(tree_depth), int(tree_fanout))
   else:
       print("Wrong topo_type")
