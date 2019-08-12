package ua.eurocrab.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "news")
public class NewsEntity extends BaseEntity {
    @Column(nullable = false)
    private String title;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String text;

    @Column(nullable = false, columnDefinition = "DATE")
    private Date date;
}
