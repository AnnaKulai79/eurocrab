package ua.eurocrab.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor

@Entity(name = "uploads_images")
@Table(name = "uploads_images")
public class UploadsImagesEntity extends BaseEntity {
    @Column(nullable = false)
    private String image;

    @ManyToOne
    @JoinColumn(name = "products_id",nullable = false)
    private ProductsEntity products;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public ProductsEntity getProducts() {
        return products;
    }

    public void setProducts(ProductsEntity products) {
        this.products = products;
    }
}
