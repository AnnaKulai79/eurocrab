package ua.eurocrab.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class ProductsDTO {
    private Long id;
    private String title;
    private int price;
    private BrandDTO brand;
    private String image;
    private String seoWords;
    private String seoDescription;
    private String miniDescription;
    private String description;
    private String minifeatures;
    private String features;
    private Date datetime;
    private boolean newTovar=false;
    private boolean leader = false;
    private boolean sale = false;
    private boolean visible = false;
    private int count = 0;
    private int yesLike = 1;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public BrandDTO getBrand() {
        return brand;
    }

    public void setBrand(BrandDTO brand) {
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
