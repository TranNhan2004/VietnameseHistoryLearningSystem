package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@Table(
        name = "responses",
        uniqueConstraints = {
                @UniqueConstraint(name = "uc_res_from_comment_and_to_comment", columnNames = {"from_comment_id", "to_comment_id"})
        }
)
public class Response extends IBaseEntity {
    @ManyToOne
    @JoinColumn(name = "from_comment_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Comment fromComment;

    @ManyToOne
    @JoinColumn(name = "to_comment_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Comment toComment;
}
