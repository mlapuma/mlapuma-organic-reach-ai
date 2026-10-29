package br.com.organicreach.partner;
import jakarta.persistence.*;
import java.util.UUID;
import java.time.OffsetDateTime;
@Entity @Table(name="partners")
public class Partner {
 @Id private UUID id;
 @Column(nullable=false,length=160) private String name;
 private String handle;
 @Column(nullable=false) private String platform;
 @Column(nullable=false) private String status;
 @Column(name="created_at",nullable=false) private OffsetDateTime createdAt;
 protected Partner(){}
 public Partner(String name,String handle,String platform){
  this.id=UUID.randomUUID();this.name=name;this.handle=handle;this.platform=platform;this.status="PENDING";this.createdAt=OffsetDateTime.now();
 }
 public UUID getId(){return id;}
 public String getName(){return name;}
 public String getHandle(){return handle;}
 public String getPlatform(){return platform;}
 public String getStatus(){return status;}
}
