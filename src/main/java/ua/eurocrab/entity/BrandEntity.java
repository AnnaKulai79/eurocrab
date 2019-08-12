package ua.eurocrab.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor

@Entity(name = "brands")
@Table(name = "brands")
public class BrandEntity extends BaseEntity {
    @Column(nullable = false, length = 20)
    private String brand;

    @ManyToOne
    @JoinColumn(name = "categories_id",nullable = false)
    private CategoryEntity categories;

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public CategoryEntity getCategories() {
        return categories;
    }

    public void setCategories(CategoryEntity categories) {
        this.categories = categories;
    }
}
