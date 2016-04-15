'use strict';

angular.module('theory.base').

factory('TNLinkedList', function(TNObject, TNNode)
{
    var
    TNLinkedList = function(options)
    {
        TNLinkedList.parent.call(this,
        {
            bidirectional : false,
            length        : 0,
            head          : null,
            tail          : null
        });

        this.options(options);
    };

    TNInheritance.extend(TNLinkedList, TNObject);

    TNLinkedList.prototype.add = function(value)
    {
        var
        properties    = this.properties,
        bidirectional = properties.bidirectional,
        length        = properties.length,
        node          = new TNNode({value : value}),
        current       = properties.head;

        if (bidirectional)
        {
            if (length > 0)
            {
                properties.tail.next = node;
                node.previous        = properties.tail;
                properties.tail      = node;
            }
            else
            {
                properties.head = node;
                properties.tail = node;
            }
        }
        else
        {
            if (length > 0)
            {
                while (current.next)
                {
                    current = current.next;
                }

                current.next = node;
            }
            else
            {
                properties.head = node;
            }
        }

        properties.length++;

        return node;
    };

    TNLinkedList.prototype.searchNodeAt = function(position)
    {
        var
        properties = this.properties,
        current    = properties.head,
        length     = properties.length,
        count      = 1,
        message    = {failure: 'Failure: non-existent node in this list'};

        if (length === 0 || position < 1 || position > length)
        {
            throw new Error(message.failure);
        }

        while (count < position)
        {
            current = current.next;
            count++;
        }

        return current;
    };

    TNLinkedList.prototype.remove = function(position)
    {
        var
        properties       = this.properties,
        bidirectional    = properties.bidirectional,
        current          = properties.head,
        length           = properties.length,
        count            = 0,
        message          = {failure: 'Failure: non-existent node in this list'},
        deleteNodeBefore = null,
        deleteNodeAfter  = null,
        deleteNode       = null,
        deletedNode      = null;

        if (bidirectional)
        {
            if (length === 0 || position < 1 || position > length)
            {
                throw new Error(message.failure);
            }

            if (position === 1)
            {
                deleteNode      = current;
                properties.head = current.next;

                if (!properties.head)
                {
                    properties.head.previous = null;
                }
                else
                {
                    properties.tail = null;
                }
            }
            else if (position === length)
            {
                properties.tail      = properties.tail.previous;
                deleteNode           = properties.tail;
                properties.tail.next = null;
            }
            else
            {
                while (count < position)
                {
                    current = current.next;
                    count++;
                }

                deleteNodeBefore = current.previous;
                deleteNode       = current;
                deleteNodeAfter  = current.next;

                deleteNodeBefore.next    = deleteNodeAfter;
                deleteNodeAfter.previous = deleteNodeBefore;
                deletedNode              = deleteNode;
                deleteNode               = null;
            }
        }
        else
        {
            if (position < 0 || position > length)
            {
                throw new Error(message.failure);
            }

            if (position === 1)
            {
                properties.head = current.next;
                deletedNode     = current;
                current         = null;
            }
            else
            {
                while (count < position)
                {
                    deleteNodeBefore = current;
                    deleteNode       = current.next;
                    count++;
                }

                deleteNodeBefore.next = deleteNode.next;
                deletedNode           = deleteNode;
                deleteNode            = null;
            }
        }

        properties.length--;

        return deletedNode;
    };

    return TNLinkedList;
});