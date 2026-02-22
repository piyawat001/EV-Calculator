import React, { useState } from 'react';
import { Battery, Zap, TrendingUp, Calculator, Navigation } from 'lucide-react';

export default function EVCalculator() {
  // State สำหรับ Function 1: คำนวณค่าชาร์จ
  const [currentBattery, setCurrentBattery] = useState('');
  const [targetBattery, setTargetBattery] = useState('100');
  const [pricePerKwh, setPricePerKwh] = useState('5.9');
  const [pricePreset, setPricePreset] = useState('5.9');
  const batteryCapacity = 54.4; // kWh (จากการคำนวณของคุณ)

  // State สำหรับ Function 2: คำนวณประสิทธิภาพ
  const [startBattery, setStartBattery] = useState('');
  const [endBattery, setEndBattery] = useState('');
  const [distance, setDistance] = useState('');

  // State สำหรับ Function 3: คำนวณระยะทางที่เหลือ
  const [remainingBattery, setRemainingBattery] = useState('');
  const [efficiencyRate, setEfficiencyRate] = useState('3.53'); // km ต่อ 1% (จากตัวอย่างของคุณ)
  const [mobilePage, setMobilePage] = useState('charge');

  // คำนวณค่าชาร์จ
  const calculateChargeCost = () => {
    const battery = parseFloat(currentBattery);
    const target = parseFloat(targetBattery);
    const price = parseFloat(pricePerKwh);
    
    if (
      isNaN(battery) ||
      isNaN(target) ||
      isNaN(price) ||
      battery < 0 ||
      battery > 100 ||
      target < 0 ||
      target > 100 ||
      target < battery
    ) {
      return null;
    }
    
    const percentToCharge = target - battery;
    const kwhNeeded = (percentToCharge / 100) * batteryCapacity;
    const cost = kwhNeeded * price;
    
    return {
      currentBattery: battery.toFixed(1),
      targetBattery: target.toFixed(1),
      percentToCharge: percentToCharge.toFixed(1),
      kwhNeeded: kwhNeeded.toFixed(2),
      cost: cost.toFixed(2)
    };
  };

  // คำนวณประสิทธิภาพ
  const calculateEfficiency = () => {
    const start = parseFloat(startBattery);
    const end = parseFloat(endBattery);
    const dist = parseFloat(distance);
    
    if (isNaN(start) || isNaN(end) || isNaN(dist) || start <= end || dist <= 0) {
      return null;
    }
    
    const batteryUsed = start - end;
    const percentPerKm = batteryUsed / dist;
    const kmPer1Percent = 1 / percentPerKm;
    const totalRange = (batteryUsed / dist) * (100 / batteryUsed) * dist;
    
    return {
      batteryUsed: batteryUsed.toFixed(1),
      percentPerKm: percentPerKm.toFixed(4),
      kmPer1Percent: kmPer1Percent.toFixed(2),
      totalRange: totalRange.toFixed(1)
    };
  };

  // คำนวณระยะทางที่เหลือ
  const calculateRemainingDistance = () => {
    const battery = parseFloat(remainingBattery);
    const efficiency = parseFloat(efficiencyRate);
    
    if (isNaN(battery) || isNaN(efficiency) || battery < 0 || battery > 100 || efficiency <= 0) {
      return null;
    }
    
    const remainingKm = battery * efficiency;
    const safeRangeKm = (battery - 10) * efficiency; // เหลือแบต 10% เป็น buffer
    
    return {
      remainingKm: remainingKm.toFixed(1),
      safeRangeKm: Math.max(0, safeRangeKm).toFixed(1),
      batteryPercent: battery.toFixed(0)
    };
  };

  const chargeCost = calculateChargeCost();
  const efficiency = calculateEfficiency();
  const remainingDistance = calculateRemainingDistance();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2 animate-fade-in">
          <Zap className="w-10 h-10 text-amber-400" strokeWidth={2.5} />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
            EV Calculator
          </h1>
        </div>
        <p className="text-slate-400 text-lg ml-13 animate-fade-in-delay">
          คำนวณค่าชาร์จและประสิทธิภาพรถไฟฟ้าของคุณ
        </p>
      </div>

      {/* Mobile Page Switcher */}
      <div className="max-w-7xl mx-auto mb-6 md:hidden">
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-2 backdrop-blur-xl">
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setMobilePage('charge')}
              className={`rounded-xl px-3 py-3 text-xs font-semibold transition-all ${
                mobilePage === 'charge'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'bg-slate-800/70 text-slate-300 border border-slate-700'
              }`}
            >
              ค่าชาร์จ
            </button>
            <button
              type="button"
              onClick={() => setMobilePage('efficiency')}
              className={`rounded-xl px-3 py-3 text-xs font-semibold transition-all ${
                mobilePage === 'efficiency'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-800/70 text-slate-300 border border-slate-700'
              }`}
            >
              ประสิทธิภาพ
            </button>
            <button
              type="button"
              onClick={() => setMobilePage('range')}
              className={`rounded-xl px-3 py-3 text-xs font-semibold transition-all ${
                mobilePage === 'range'
                  ? 'bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800/70 text-slate-300 border border-slate-700'
              }`}
            >
              ระยะทาง
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 px-1">
            มือถือ: แสดงทีละหน้าเพื่อใช้งานสะดวกขึ้น • Desktop: แสดงครบทุกการ์ด
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: คำนวณค่าชาร์จ */}
        <div
          className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-700/50 shadow-2xl hover:border-amber-500/30 transition-all duration-300 animate-slide-up ${
            mobilePage === 'charge' ? 'block' : 'hidden'
          } md:block`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Battery className="w-7 h-7 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-amber-400">คำนวณค่าชาร์จ</h2>
          </div>

          <div className="space-y-5">
            {/* Input: แบตเตอรี่ปัจจุบัน */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                แบตเตอรี่ปัจจุบัน (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={currentBattery}
                  onChange={(e) => setCurrentBattery(e.target.value)}
                  placeholder="เช่น 13"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  %
                </span>
              </div>
            </div>

            {/* Input: ราคาต่อหน่วย */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                ต้องการชาร์จถึง (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={targetBattery}
                  onChange={(e) => setTargetBattery(e.target.value)}
                  placeholder="เช่น 80"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  %
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                กรอกเป้าหมาย เช่น 80% เพื่อคำนวณค่าใช้จ่ายแบบชาร์จไม่เต็ม 100%
              </p>
            </div>

            {/* Input: ราคาต่อหน่วย */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                ราคาต่อหน่วย (บาท/kWh)
              </label>
              <div className="mb-3">
                <select
                  value={pricePreset}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setPricePreset(selected);
                    if (selected !== 'custom') {
                      setPricePerKwh(selected);
                    }
                  }}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                >
                  <option value="5.9" className="bg-slate-900">5.9 บาท/kWh</option>
                  <option value="6.9" className="bg-slate-900">6.9 บาท/kWh</option>
                  <option value="custom" className="bg-slate-900">กรอกเอง</option>
                </select>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={pricePerKwh}
                  onChange={(e) => {
                    setPricePreset('custom');
                    setPricePerKwh(e.target.value);
                  }}
                  placeholder="เช่น 5.9"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  ฿/kWh
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                เลือก 5.9 / 6.9 ได้ทันที หรือเลือก "กรอกเอง" แล้วใส่ราคาที่ต้องการ
              </p>
            </div>

            {/* ข้อมูลความจุแบต */}
            <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/50">
              <p className="text-sm text-slate-400">ความจุแบตเตอรี่</p>
              <p className="text-xl font-bold text-amber-400">{batteryCapacity} kWh</p>
            </div>

            {/* Tips: Off-Peak */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-400/40 bg-gradient-to-br from-cyan-400/15 via-sky-500/10 to-blue-500/15 p-5 shadow-lg shadow-cyan-500/10">
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-cyan-300/10 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-blue-400/10 blur-2xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200 mb-3">
                  <Zap className="w-4 h-4" />
                  OFF-PEAK TIP
                </div>

                <p className="text-base font-bold text-white leading-snug mb-2">
                  ชาร์จช่วงนี้ประหยัดกว่าเดิม (ค่าไฟถูกลงเกือบครึ่ง)
                </p>

                <div className="space-y-3 mt-4">
                  <div className="rounded-xl border border-cyan-300/20 bg-slate-950/40 p-3">
                    <p className="text-xs text-cyan-200 font-semibold mb-1">วันจันทร์ - ศุกร์</p>
                    <p className="text-sm text-white font-bold">22.00 น. - 09.00 น.</p>
                    <p className="text-xs text-slate-400">(ของวันถัดไป)</p>
                  </div>

                  <div className="rounded-xl border border-cyan-300/20 bg-slate-950/40 p-3">
                    <p className="text-xs text-cyan-200 font-semibold mb-1">
                      วันเสาร์ - อาทิตย์ / วันหยุดราชการ
                    </p>
                    <p className="text-sm text-white font-bold">ตลอด 24 ชั่วโมง</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ผลลัพธ์ */}
            {chargeCost && (
              <div className="mt-6 p-5 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-xl border border-amber-500/30 animate-fade-in">
                <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  ผลการคำนวณ
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">ชาร์จจาก → ถึง</span>
                    <span className="text-lg font-bold text-white">
                      {chargeCost.currentBattery}% → {chargeCost.targetBattery}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">ต้องชาร์จเพิ่ม</span>
                    <span className="text-xl font-bold text-white">{chargeCost.percentToCharge}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">พลังงาน</span>
                    <span className="text-xl font-bold text-white">{chargeCost.kwhNeeded} kWh</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent my-3"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">ค่าใช้จ่าย</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                      {chargeCost.cost} ฿
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: คำนวณประสิทธิภาพ */}
        <div
          className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-700/50 shadow-2xl hover:border-emerald-500/30 transition-all duration-300 animate-slide-up-delay ${
            mobilePage === 'efficiency' ? 'block' : 'hidden'
          } md:block`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <TrendingUp className="w-7 h-7 text-emerald-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-400">คำนวณประสิทธิภาพ</h2>
          </div>

          <div className="space-y-5">
            {/* Input: แบตเริ่มต้น */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                แบตเตอรี่เริ่มต้น (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={startBattery}
                  onChange={(e) => setStartBattery(e.target.value)}
                  placeholder="เช่น 100"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  %
                </span>
              </div>
            </div>

            {/* Input: แบตสิ้นสุด */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                แบตเตอรี่สิ้นสุด (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={endBattery}
                  onChange={(e) => setEndBattery(e.target.value)}
                  placeholder="เช่น 16"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  %
                </span>
              </div>
            </div>

            {/* Input: ระยะทาง */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                ระยะทางที่วิ่ง (km)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="เช่น 296.2"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  km
                </span>
              </div>
            </div>

            {/* ผลลัพธ์ */}
            {efficiency && (
              <div className="mt-6 p-5 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/30 animate-fade-in">
                <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  ผลการคำนวณ
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">แบตที่ใช้</span>
                    <span className="text-xl font-bold text-white">{efficiency.batteryUsed}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">อัตราการใช้</span>
                    <span className="text-lg font-bold text-white">{efficiency.percentPerKm}% / km</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">ระยะทางต่อ 1%</span>
                    <span className="text-lg font-bold text-white">{efficiency.kmPer1Percent} km</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent my-3"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">ระยะทางรวม (100%)</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                      {efficiency.totalRange} km
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: คำนวณระยะทางที่เหลือ */}
        <div
          className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-700/50 shadow-2xl hover:border-blue-500/30 transition-all duration-300 animate-slide-up-delay-2 ${
            mobilePage === 'range' ? 'block' : 'hidden'
          } md:block`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Navigation className="w-7 h-7 text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-400">ระยะทางที่เหลือ</h2>
          </div>

          <div className="space-y-5">
            {/* Input: แบตเตอรี่ปัจจุบัน */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                แบตเตอรี่ปัจจุบัน (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={remainingBattery}
                  onChange={(e) => setRemainingBattery(e.target.value)}
                  placeholder="เช่น 75"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  %
                </span>
              </div>
            </div>

            {/* Input: อัตราประสิทธิภาพ */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                ประสิทธิภาพ (km ต่อ 1%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={efficiencyRate}
                  onChange={(e) => setEfficiencyRate(e.target.value)}
                  placeholder="เช่น 3.53"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  km/1%
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                💡 ใช้ค่าจาก "คำนวณประสิทธิภาพ" หรือค่าเฉลี่ยจากการใช้งานจริง
              </p>
            </div>

            {/* ผลลัพธ์ */}
            {remainingDistance && (
              <div className="mt-6 space-y-4 animate-fade-in">
                {/* ระยะทางสูงสุด */}
                <div className="p-5 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/30">
                  <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    ระยะทางที่วิ่งได้
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">ระยะทางสูงสุด</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {remainingDistance.remainingKm} km
                    </span>
                  </div>
                </div>

                {/* ระยะทางปลอดภัย */}
                <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300 text-sm">ระยะทางปลอดภัย (Buffer 10%)</span>
                    <span className="text-xl font-bold text-green-400">
                      {remainingDistance.safeRangeKm} km
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    แนะนำให้วางแผนชาร์จก่อนแบตต่ำกว่า 10%
                  </p>
                </div>

                {/* Battery gauge */}
                <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">แบตเตอรี่ปัจจุบัน</span>
                    <span className="text-lg font-bold text-white">{remainingDistance.batteryPercent}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${
                        parseFloat(remainingDistance.batteryPercent) > 50 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : parseFloat(remainingDistance.batteryPercent) > 20
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                          : 'bg-gradient-to-r from-red-500 to-orange-500'
                      }`}
                      style={{ width: `${remainingDistance.batteryPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-8 text-center">
        <p className="text-slate-500 text-sm animate-fade-in-delay-2">
          ข้อมูลความจุแบตเตอรี่: {batteryCapacity} kWh • สร้างสำหรับการใช้งานส่วนตัว
        </p>
      </div>

    </div>
  );
}
