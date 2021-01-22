package com.foodmanager.foodplan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan("com.foodmanager.models")
@EntityScan("com.foodmanager.models")
public class FoodplanApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodplanApplication.class, args);
	}

}
