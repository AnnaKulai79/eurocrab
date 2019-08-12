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

@Entity(name = "ipadd")
@Table(name = "ipadd")
public class IpaddEntity extends BaseEntity {
    @Column(nullable = false, length = 100)
    private String ip;

    @Column(nullable = false, length = 100)
    private Long count;

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
