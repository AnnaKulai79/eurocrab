package ua.eurocrab.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class BuyProductsDTO {
    private Long id;
    private OrdersDTO orders;
    private ProductsDTO products;
    private int countProduct;
}
