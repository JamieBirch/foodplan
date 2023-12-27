package com.foodmanager.foodplan;

import com.foodmanager.models.Ingredient;
import com.foodmanager.models.IngredientRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    public Ingredient addIngredient(IngredientRequest ingredientRequest) {

        List<Ingredient> repositoryIngredientWithSameName = ingredientRepository.findByName(ingredientRequest.getName());
        if (!repositoryIngredientWithSameName.isEmpty()) {
            throw new RuntimeException(String.format("ingredient with name %s already exists", ingredientRequest.getName()));
        }

        Ingredient ingredient = mappingService.ingredientRequestToIngredient(ingredientRequest);
        return ingredientRepository.save(ingredient);
    }

    @Transactional
    public List<Ingredient> addIngredients(List<IngredientRequest> ingredientsRequest) {
        ingredientsRequest.stream()
                .distinct()
                .forEach(this::addIngredient);
        return ingredientRepository.findAll();
    }

    @Transactional
    public void deleteIngredient(long id) {
        ingredientRepository.deleteById(id);
    }
}
