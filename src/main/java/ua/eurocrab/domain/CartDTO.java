package ua.eurocrab.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class CartDTO {
    private Long id;
    private ProductsDTO products;
    private int price;
    private int count;
    private Date datetime;
    private String ip;

}

