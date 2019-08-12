package ua.eurocrab.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class FeedbackDTO {
    private Long id;
    private String name;
    private String email;
    private String subject;
    private String text;
    private Date date;
}
