package ua.eurocrab.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor

@Entity(name = "cart")
@Table(name = "cart")
public class CartEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "products_id",nullable = false)
    private ProductsEntity products;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private int count;

    @Column(nullable = false, columnDefinition = "DATETIME")
    private Date datetime;

    @Column(nullable = false)
    private String ip;

    public ProductsEntity getProducts() {
        return products;
    }

    public void setProducts(ProductsEntity products) {
        this.products = products;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public Date getDatetime() {
        return datetime;
    }

    public void setDatetime(Date datetime) {
        this.datetime = datetime;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }
}
