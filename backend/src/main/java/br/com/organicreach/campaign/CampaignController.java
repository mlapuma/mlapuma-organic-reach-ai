package br.com.organicreach.campaign;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.net.URI;
import java.util.List;
import java.util.UUID;
@RestController @RequestMapping("/api/campaigns")
public class CampaignController {
 private final CampaignRepository repository;
 public CampaignController(CampaignRepository repository){this.repository=repository;}
 public record CreateCampaign(@NotBlank @Size(max=160) String title, String description, String landingUrl) {}
 @GetMapping public List<Campaign> list(){return repository.findAll();}
 @GetMapping("/{id}") public Campaign get(@PathVariable UUID id){
  return repository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Campanha não encontrada"));
 }
 @PostMapping public ResponseEntity<Campaign> create(@Valid @RequestBody CreateCampaign request){
  if(request.landingUrl()!=null && !request.landingUrl().isBlank()){
   try { URI uri=URI.create(request.landingUrl()); if(!List.of("http","https").contains(uri.getScheme()) || uri.getHost()==null) throw new IllegalArgumentException(); }
   catch(Exception ex){throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"URL inválida");}
  }
  Campaign saved=repository.save(new Campaign(request.title(),request.description(),request.landingUrl()));
  return ResponseEntity.created(URI.create("/api/campaigns/"+saved.getId())).body(saved);
 }
}
