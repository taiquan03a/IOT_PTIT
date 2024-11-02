package PTIT.IOT.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "action")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String device;
    private String action;
    private LocalDateTime time;
}
