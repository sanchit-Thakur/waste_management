/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: educationalcontent
 * Interface for EducationalContent
 */
export interface EducationalContent {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  mainContent?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType text */
  benefitCategory?: string;
  /** @wixFieldType url */
  learnMoreUrl?: string;
}


/**
 * Collection ID: ewastereports
 * Interface for EWasteReports
 */
export interface EWasteReports {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  requestId?: string;
  /** @wixFieldType text */
  userName?: string;
  /** @wixFieldType text */
  userPhoneNumber?: string;
  /** @wixFieldType text */
  userEmail?: string;
  /** @wixFieldType text */
  state?: string;
  /** @wixFieldType text */
  district?: string;
  /** @wixFieldType text */
  fullAddress?: string;
  /** @wixFieldType text */
  pincode?: string;
  /** @wixFieldType text */
  wasteType?: string;
  /** @wixFieldType text */
  estimatedQuantity?: string;
  /** @wixFieldType text */
  wasteDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  wasteImages?: string;
  /** @wixFieldType date */
  pickupDate?: Date | string;
  /** @wixFieldType time */
  pickupTime?: any;
  /** @wixFieldType text */
  status?: string;
}


/**
 * Collection ID: impactstatistics
 * Interface for ImpactStatistics
 */
export interface ImpactStatistics {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  metricName?: string;
  /** @wixFieldType number */
  metricValue?: number;
  /** @wixFieldType text */
  metricUnit?: string;
  /** @wixFieldType text */
  metricDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  metricImage?: string;
}


/**
 * Collection ID: recyclingcenters
 * Interface for RecyclingCenters
 */
export interface RecyclingCenters {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  centerName?: string;
  /** @wixFieldType text */
  addressLine1?: string;
  /** @wixFieldType text */
  addressLine2?: string;
  /** @wixFieldType text */
  district?: string;
  /** @wixFieldType text */
  state?: string;
  /** @wixFieldType text */
  pincode?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType url */
  website?: string;
}


/**
 * Collection ID: wastetypes
 * Interface for WasteTypes
 */
export interface WasteTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  wasteTypeName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType boolean */
  isCommon?: boolean;
}
