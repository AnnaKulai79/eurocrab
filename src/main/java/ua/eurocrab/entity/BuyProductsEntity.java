package ua.eurocrab.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "buy_products")
public class BuyProductsEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "orders_id",nullable = false)
    private OrdersEntity orders;

    @ManyToOne
    @JoinColumn(name = "products_id",nullable = false)
    private ProductsEntity products;

    @Column(name = "count_product",nullable = false)
    private int countProduct;

}
