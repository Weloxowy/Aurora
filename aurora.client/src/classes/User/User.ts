// User.ts
export interface UserProps {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    isUserProfileActive: boolean | null;
    userRank: number;
    addressId: string | null;
    familyMemberId: string | null;
    bankInfoEntityId: string | null;
    personalInfoEntityId: string;
    street: string | null;
    postalCode: string | null;
    city: string | null;
    region: string | null;
    country: string | null;
    accountNumber: string | null;
    ibanAccountNumber: string | null;
    bankName: string | null;
    swiftBankCode: string | null;
    bankCountry: string | null;
    ownerName: string | null;
    us: string;
    cityUS: string;
    hireDate: string;
    fireDate: string;
    department: string;
    position: string;
    nip: string;
    healthCareNumber: string;
    personalNotes: string;
    typeOfContract: number;
}

export class User {
    private static instance: User;
    public userId: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public isUserProfileActive: boolean | null;
    public userRank: number;
    public addressId: string | null;
    public familyMemberId: string | null;
    public bankInfoEntityId: string | null;
    public personalInfoEntityId: string;
    public street: string | null;
    public postalCode: string | null;
    public city: string | null;
    public region: string | null;
    public country: string | null;
    public accountNumber: string | null;
    public ibanAccountNumber: string | null;
    public bankName: string | null;
    public swiftBankCode: string | null;
    public bankCountry: string | null;
    public ownerName: string | null;
    public us: string;
    public cityUS: string;
    public hireDate: string;
    public fireDate: string;
    public department: string;
    public position: string;
    public nip: string;
    public healthCareNumber: string;
    public personalNotes: string;
    public typeOfContract: number;

    private constructor() {}

    public static getInstance(): User {
        if (!User.instance) {
            User.instance = new User();
        }
        return User.instance;
    }

    public setUser(userJSON: UserProps): void {
        this.userId = userJSON.userId;
        this.firstName = userJSON.firstName;
        this.lastName = userJSON.lastName;
        this.email = userJSON.email;
        this.isUserProfileActive = userJSON.isUserProfileActive;
        this.userRank = userJSON.userRank;
        this.addressId = userJSON.addressId;
        this.familyMemberId = userJSON.familyMemberId;
        this.bankInfoEntityId = userJSON.bankInfoEntityId;
        this.personalInfoEntityId = userJSON.personalInfoEntityId;
        this.street = userJSON.street;
        this.postalCode = userJSON.postalCode;
        this.city = userJSON.city;
        this.region = userJSON.region;
        this.country = userJSON.country;
        this.accountNumber = userJSON.accountNumber;
        this.ibanAccountNumber = userJSON.ibanAccountNumber;
        this.bankName = userJSON.bankName;
        this.swiftBankCode = userJSON.swiftBankCode;
        this.bankCountry = userJSON.bankCountry;
        this.ownerName = userJSON.ownerName;
        this.us = userJSON.us;
        this.cityUS = userJSON.cityUS;
        this.hireDate = userJSON.hireDate;
        this.fireDate = userJSON.fireDate;
        this.department = userJSON.department;
        this.position = userJSON.position;
        this.nip = userJSON.nip;
        this.healthCareNumber = userJSON.healthCareNumber;
        this.personalNotes = userJSON.personalNotes;
        this.typeOfContract = userJSON.typeOfContract;
    }
}
