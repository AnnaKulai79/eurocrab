package ua.eurocrab.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor

@Entity(name = "reviews")
@Table(name = "reviews")
public class ReviewsEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "products_id",nullable = false)
    private ProductsEntity products;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "good_reviews", nullable = false, columnDefinition = "TEXT")
    private String goodReviews;

    @Column(name = "bad_reviews", nullable = false, columnDefinition = "TEXT")
    private String badReviews;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String comment;

    @Column(nullable = false, columnDefinition = "DATE")
    private Date date;

    @Column(nullable = false)
    private boolean moderat = false;

    public ProductsEntity getProducts() {
        return products;
    }

    public void setProducts(ProductsEntity products) {
        this.products = products;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGoodReviews() {
        return goodReviews;
    }

    public void setGoodReviews(String goodReviews) {
        this.goodReviews = goodReviews;
    }

    public String getBadReviews() {
        return badReviews;
    }

    public void setBadReviews(String badReviews) {
        this.badReviews = badReviews;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isModerat() {
        return moderat;
    }

    public void setModerat(boolean moderat) {
        this.moderat = moderat;
    }
}
