package com.foodmanager.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;

    private Integer ccal;
    private Integer protein;
    private Integer fat;
    private Integer carbs;

    @OneToMany(
                    mappedBy = "food",
                    cascade = CascadeType.ALL,
                    orphanRemoval = true
            )
    @JsonIgnoreProperties("food")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<IngredientInfo> ingredients = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String recipe;

}
