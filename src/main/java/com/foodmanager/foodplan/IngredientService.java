package com.foodmanager.foodplan;

import com.foodmanager.models.Ingredient;
import com.foodmanager.models.IngredientRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IngredientService {

    private IngredientRepository ingredientRepository;
    private MappingService mappingService;
    public List<Ingredient> getIngredients() {
        return ingredientRepository.findAll();
    }

    @Autowired
    public IngredientService(IngredientRepository ingredientRepository, MappingService mappingService) {
        this.ingredientRepository = ingredientRepository;
        this.mappingService = mappingService;
    }

    @Transactional
    public void addIngredient(IngredientRequest ingredientRequest) {
        Ingredient ingredient = mappingService.ingredientRequestToIngredient(ingredientRequest);
        ingredientRepository.save(ingredient);
    }

    @Transactional
    public void addIngredients(List<IngredientRequest> ingredientsRequest) {
        List<Ingredient> ingredients = ingredientsRequest.stream()
                .distinct()
                .map(i -> mappingService.ingredientRequestToIngredient(i))
                .collect(Collectors.toList());
        ingredientRepository.saveAll(ingredients);
    }

    @Transactional
    public void deleteIngredient(long id) {
        ingredientRepository.deleteById(id);
    }
}
