package com.blank.tests;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;

import org.junit.Test;

import lombok.extern.slf4j.Slf4j;

//@SpringBootTest(classes = { DomainTestConfiguration.class })
//@RunWith(SpringRunner.class)
//@ActiveProfiles("h2")
//@Rollback
@Slf4j
public class index {
    
    @Test
    public void test() {
    	Solution solution = new Solution();
    	ListNode node = new ListNode(1);
    	ListNode node2 = new ListNode(3);
    	ListNode node3 = new ListNode(2);
    	node.next = node2;
    	node2.next = node3;
    	int nums[] = solution.reversePrint(node);
    	for(int i:nums){
    		log.info(String.valueOf(i));
    	}
    }
    
    // 第一次尝试
    static class Solution {
        int[] reversePrint(ListNode head) {
        	Deque<Integer> deque = new ArrayDeque<Integer>();
        	ListNode node = head;
        	int i = 0;
        	while(node != null){
        		deque.push(node.val);
        		i++;
        		node = node.next;
        	}
        	List<Integer> list = new ArrayList<>();
        	while(deque.size()>0){
        		list.add(deque.pop());
        	}
        	Integer[] integers = list.toArray(new Integer[list.size()]);
            return Arrays.stream(integers).mapToInt(Integer::valueOf).toArray();
        }
    }
    
    
    public class ListNode {
    	int val;
    	ListNode next;
    	ListNode(int x) { val = x; }
    }
}


// 第二次尝试 stack比deque的性能要好
int[] reversePrint(ListNode head) {
    Stack<Integer> deque = new Stack<>();
    ListNode node = head;
    while(node != null){
        deque.push(node.val);
        node = node.next;
    }
    int nums[] = new int[deque.size()];
    int i = 0;
    while(deque.size()>0){
        nums[i] = deque.pop();
        i++;
    }
    return nums;
}