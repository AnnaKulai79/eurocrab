package ua.eurocrab.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor

@Entity(name = "products")
@Table(name = "products")
public class ProductsEntity extends BaseEntity {
    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private int price;

    @OneToOne
    @JoinColumn(name = "brand_id",nullable = false)
    private BrandEntity brand;

    @Column(nullable = false)
    private String image;

    @Column(name = "seo_words", columnDefinition = "TEXT", nullable = false)
    private String seoWords;

    @Column(name = "seo_description", columnDefinition = "TEXT", nullable = false)
    private String seoDescription;

    @Column(name = "mini_description", columnDefinition = "TEXT", nullable = false)
    private String miniDescription;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "mini_features", columnDefinition = "TEXT", nullable = false)
    private String minifeatures;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String features;

    @Column(columnDefinition = "datetime", nullable = false)
    private Date datetime;

    @Column(nullable = false, name = "new_tovar")
    private boolean newTovar = false;

    @Column(nullable = false)
    private boolean leader = false;

    @Column(nullable = false)
    private boolean sale = false;

    @Column(nullable = false)
    private boolean visible = false;

    @Column(nullable = false)
    private int count = 0;

    @Column(nullable = false, name = "yes_like")
    private int yesLike = 1;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public BrandEntity getBrand() {
        return brand;
    }

    public void setBrand(BrandEntity brand) {
        this.brand = brand;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getSeoWords() {
        return seoWords;
    }

    public void setSeoWords(String seoWords) {
        this.seoWords = seoWords;
    }

    public String getSeoDescription() {
        return seoDescription;
    }

    public void setSeoDescription(String seoDescription) {
        this.seoDescription = seoDescription;
    }

    public String getMiniDescription() {
        return miniDescription;
    }

    public void setMiniDescription(String miniDescription) {
        this.miniDescription = miniDescription;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMinifeatures() {
        return minifeatures;
    }

    public void setMinifeatures(String minifeatures) {
        this.minifeatures = minifeatures;
    }

    public String getFeatures() {
        return features;
    }

    public void setFeatures(String features) {
        this.features = features;
    }

    public Date getDatetime() {
        return datetime;
    }

    public void setDatetime(Date datetime) {
        this.datetime = datetime;
    }

    public boolean isNewTovar() {
        return newTovar;
    }

    public void setNewTovar(boolean newTovar) {
        this.newTovar = newTovar;
    }

    public boolean isLeader() {
        return leader;
    }

    public void setLeader(boolean leader) {
        this.leader = leader;
    }

    public boolean isSale() {
        return sale;
    }

    public void setSale(boolean sale) {
        this.sale = sale;
    }

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getYesLike() {
        return yesLike;
    }

    public void setYesLike(int yesLike) {
        this.yesLike = yesLike;
    }
}
