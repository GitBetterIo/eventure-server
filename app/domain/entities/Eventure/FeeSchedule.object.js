const isString = require('lodash/isString')
const isDate = require('lodash/isDate')
const isFinite = require('lodash/isFinite')
const formatDate = require('date-fns/format')
const parseDate = require('date-fns/parse')

const byFeeDate = (a,b) => a.feeDate > b.feeDate ? 1 : 0
const unique = (value, index, ary) => ary.indexOf(value) === index
const mostRecentFee = d => (recent, fee) => fee.feeDate <= d ? fee : recent
const earlierThan = d => fee => fee.feeDate <= d

module.exports = ({}) => {
  const FeeSchedule = {
    addFee({feeDate, fee, close=false}) {
      
      feeDate = isString(feeDate) ? parseDate(feeDate) : new Date(feeDate)
      
      if (isNaN(feeDate)) {
        throw new Error('Missing or unknown format for feeDate')
      }
      
      feeDate = formatDate(feeDate, 'YYYY-MM-DD')
      
      // If the fee is being added after the close date, make this one the new close date
      close = (this.closeDate && feeDate > this.closeDate) ? true : Boolean(close)
      
      // If this is the close date (ie no pricing after this date), then the fee can be
      // null/undefined.  Otherwise, it must be a positive number
      fee = Number(fee)
      if (close) {
        fee = isNaN(fee) ? null : fee
      } else if (!isFinite(fee) || fee < 0) {
        throw new Error('fee must be a number greater than or equal to zero')
      }
      
      // if this fee is the new close date, clear the old one
      const closeIndex = this.fees.findIndex(fee => fee.feeDate === this.closeDate)
      if (closeIndex >= 0) {
        this.fees[closeIndex].close = false;
      }
      
      // Simply overwrite an existing fee rather than throw an exception
      const feeIndex = this.fees.findIndex(fee => fee.feeDate === feeDate)
      if (feeIndex >= 0) {
        this.fees[feeIndex] = {feeDate, fee, close}
      } else {
        this.fees.push({feeDate, fee, close})
        this.fees.sort(byFeeDate)
      }


      this.closeDate = this.getCloseDate()
      
    },
    getCloseDate() {
      const closeFee = this.fees.find(fee => fee.close)
      return closeFee ? closeFee.feeDate : null
    },
    toTable(additionalDates = []) {
      return this.fees
        .map(fee => fee.feeDate)
        .concat(additionalDates)
        .filter(unique)
        .sort()
        .map(feeDate => this.calculateFee(feeDate))
    },
    getDates() {
      return this.fees.map(fee => fee.feeDate)
    },
    calculateFee(feeDate) {

      const fee = (this.isWithinScheduleRange(feeDate)) 
        ? this.fees.reduce(mostRecentFee(feeDate))
        : {restricted: true}

      return {
        feeDate,
        fee: fee.fee,
        derived: fee.feeDate !== feeDate,
        restricted: Boolean(fee.restricted),
      }
    },
    getFee(feeDate) {
      return this.calculateFee(feeDate).fee
    },
    isWithinScheduleRange(testDate) {
      return this.fees[0].feeDate <= testDate && (!this.closeDate || this.closeDate >= testDate)
    },
    toJSON() {
      return this.fees
    },
  }
  
  const FeeSchedulePrototype = Object.assign({}, FeeSchedule)
  
  const CreateFeeSchedule = (fsData) => {
    fsData = fsData || [];

    if (!Array.isArray(fsData)) {
      throw new Error('Expected an array when creating a fee schedule')
    }

    const feeSchedule = Object.create(FeeSchedulePrototype)
    feeSchedule.fees = []
    feeSchedule.closeDate = feeSchedule.getCloseDate()

    fsData.forEach(fee => feeSchedule.addFee(fee))

    return feeSchedule
  }

  return CreateFeeSchedule
}
