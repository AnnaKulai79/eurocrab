package ua.eurocrab.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class ReviewsDTO {
    private Long id;
    private ProductsDTO products;
    private String name;
    private String goodReviews;
    private String badReviews;
    private String comment;
    private Date date;
    private boolean moderat = false;
}
