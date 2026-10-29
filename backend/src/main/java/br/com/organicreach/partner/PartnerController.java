package br.com.organicreach.partner;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.net.URI;
import java.util.*;
@RestController @RequestMapping("/api/partners")
public class PartnerController {
 private final PartnerRepository repository;
 public PartnerController(PartnerRepository repository){this.repository=repository;}
 public record CreatePartner(@NotBlank @Size(max=160) String name,@Size(max=120) String handle,@NotBlank @Pattern(regexp="INSTAGRAM|FACEBOOK") String platform){}
 @GetMapping public List<Partner> list(){return repository.findAll();}
 @PostMapping public ResponseEntity<Partner> create(@Valid @RequestBody CreatePartner data){
  Partner saved=repository.save(new Partner(data.name(),data.handle(),data.platform()));
  return ResponseEntity.created(URI.create("/api/partners/"+saved.getId())).body(saved);
 }
}
