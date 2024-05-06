namespace Aurora.Server.Models.PersonalInfoEntity
{
    public enum TypeOfContract
    {
        EmploymentContract = 0, //Umowa o pracę
        FixedTermContract = 1, // Umowa na czas określony
        IndefiniteTermContract = 2,  //Umowa na czas nieokreślony
        PartTimeContract = 3, //Umowa na część etatu
        FullTimeContract = 4, //Umowa na pełny etat
        FreelanceContract = 5, //Umowa o dzieło
        ServiceContract = 6, //Umowa o świadczenie usług
        InternshipContract = 7, //Umowa stażowa
        TemporaryContract = 8, //Umowa tymczasowa
        ZeroHoursContract = 9, //Umowa o pracę na żądanie
        AgencyContract = 10, //Umowa agencyjna
        ConsultingContract = 11, //Umowa konsultacyjna
        ZeroHourContract = 12, //Umowa o pracę na żądanie
        SeasonalContract = 13, //Umowa sezonowa
    }
}
