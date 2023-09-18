/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.hello;

import java.util.Scanner;

/**
 *
 * @author Summer
 */
public class Hello {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Name: ");
        String Name = scanner.nextLine();
        
        System.out.println("Age: ");
        int Age = Integer.parseInt(scanner.nextLine());
        
        System.out.println("Gender: ");
        String Gender = scanner.nextLine();
        
        System.out.println("PhoneNumber: ");
        String Phone = scanner.nextLine();
        
        System.out.println("================================");
        
        System.out.println("My Name: " + Name);
        System.out.println("My Age: " + Age);
        System.out.println("My Sex: " + Gender);
        System.out.println("My PhoneNumber: " + Phone);
        System.out.println("Thank you, have a good day");
    }
}
