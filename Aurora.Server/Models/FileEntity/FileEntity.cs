using System.Text.Json.Nodes;

namespace Aurora.Server.Models.FileEntity
{
    public class FileEntity
    {
        public FileEntity(): base() { }

        public FileEntity(Guid id, Guid senderId, Guid[] recieversId, string description, string typeOfDocument, string[] tags, FileStatus status, DateTime createDate, string language)
        {
            Id = id;
            SenderId = senderId;
            RecieversId = recieversId;
            Description = description;
            TypeOfDocument = typeOfDocument;
            Tags = tags;
            Status = status;
            CreateDate = createDate;
            Language = language;
        }

        public virtual Guid Id { get; set; }
        public virtual Guid SenderId { get; set; }
        public virtual Guid[] RecieversId { get; set; }
        public virtual string Description { get; set; }
        public virtual string TypeOfDocument { get; set; }
        public virtual string[]? Tags { get; set; }
        public virtual FileStatus Status { get; set; }
        public virtual DateTime CreateDate { get; set; }
        public virtual string Language { get; set; }



    }
}
/*
 Title - Tytuł dokumentu
Description - Opis dokumentu
Content - Treść dokumentu
Category - Kategoria dokumentu
Tags - Tagi przypisane do dokumentu
Language - Język dokumentu
Status - Status dokumentu (np. "W trakcie", "Zatwierdzony", "Odrzucony")
Priority - Priorytet dokumentu
Version - Wersja dokumentu
RevisionDate - Data ostatniej rewizji dokumentu
ExpirationDate - Data ważności dokumentu
Author - Autor dokumentu
LastEditor - Ostatnio edytowany przez
AssignedTo - Osoba przypisana do dokumentu
Location - Lokalizacja dokumentu (np. URL, ścieżka pliku)
Attachments - Załączniki dokumentu
RelatedDocuments - Powiązane dokumenty
ApprovalDate - Data zatwierdzenia dokumentu
ApprovalBy - Osoba zatwierdzająca dokument
CreationLocation - Miejsce utworzenia dokumentu
Department - Dział w firmie, który jest związany z dokumentem
ConfidentialityLevel - Poziom poufności dokumentu
Reviewers - Osoby przypisane do przeglądu dokumentu
Comments - Komentarze do dokumentu
References - Referencje lub odnośniki w dokumencie
Purpose - Cel dokumentu
CompletionDate - Data ukończenia dokumentu
Source - Źródło dokumentu
ArchiveDate - Data archiwizacji dokumentu
 */
