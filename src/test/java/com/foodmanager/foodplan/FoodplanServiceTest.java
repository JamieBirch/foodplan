package com.foodmanager.foodplan;

import com.foodmanager.models.FoodRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class FoodplanServiceTest {

    //TODO clean DB between test runs
    @Autowired
    private FoodplanService foodplanService;

    @Autowired
    private FoodRepository foodRepository;

    @Test
    @Transactional
    @DirtiesContext
    void addFoodTest() {
        FoodRequest foodRequest = new FoodRequest();
        foodRequest.setName("Test food");
        foodRequest.setCcal(100);
        foodRequest.setCarbs(10);
        foodRequest.setFat(5);
        foodRequest.setProtein(15);
        foodRequest.setRecipe("Test recipe");

        foodplanService.addFood(foodRequest);

        assertThat(foodRepository.count()).isEqualTo(1);
    }

}